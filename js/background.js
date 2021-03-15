/*
 * Copyright 2018 Viktor Somogyi-Vass
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['defaultUrl', 'defaultRegex', 'projects'], function(result) {
    if (result.defaultUrl === undefined || result.defaultUrl === null) {
      chrome.storage.sync.set({defaultUrl: 'https://broadcomcsm.service-now.com/sn_customerservice_case.do?sysparm_query=number='}, function() {
        console.log('Setting initial JIRA URL')
      });
    }
    if (result.defaultRegex === undefined || result.defaultRegex === null) {
      chrome.storage.sync.set({defaultRegex: '[C,c][S,s]\\d{6,12}'}, function() {
        console.log('Setting initial regex')
      });
    }
    if (result.projects === undefined || result.projects === null) {
      var projectsArray = [{
        "url": "https://ingjira.broadcom.net/browse/",
        "regex": "[S,s][D,d][K,k]-\\d{4,7}"
      },{
        "url": "https://broadcomcsm.service-now.com/csm?id=search&t=kb&q=",
        "regex": "[K,k][B,b]\\d{6,8}"       
      },{
        "url": "https://ingjira.broadcom.net/browse/",
        "regex": "[A,a][R,r][C,c][H,h][A,a][D,d]-\\d{1,5}"       
      },{
        "url": "https://ingjira.broadcom.net/browse/",
        "regex": "[U,u][K,k][E,e][R,r][N,n][E,e][L,l]-\\d{1,5}"       
      },{
        "url": "https://ingjira.broadcom.net/browse/",
        "regex": "[K,k][B,b][P,p][S,s][D,d][K,k]-\\d{1,5}"       
      },{
        "url": "https://ingjira.broadcom.net/browse/",
        "regex": "[K,k][B,b][P,p]-\\d{1,5}"       
      }
    ]

      chrome.storage.sync.set({
        'projects': projectsArray
      }, function() {
        console.log('Saved project URLs ' + JSON.stringify(projectsArray));
      });
    }
  });
});

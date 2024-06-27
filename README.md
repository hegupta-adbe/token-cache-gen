# Token cache initial value generation
## Google
Open the following URL in the browser:
```
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=<client_id>&redirect_uri=<redirect_uri>&scope=https://www.googleapis.com/auth/spreadsheets&state=<any_random_value>&response_type=code&include_granted_scopes=true&prompt=consent
```
After consent is granted, the browser will redirect to a URL of the form:
```
<redirect_uri>?state=<supplied_state>&code=<code>&scope=https://www.googleapis.com/auth/spreadsheets
```
Note the above code value, switch to the directory where this repo is checked out and run the following:
```
node . google <client_id> <client_secret> <redirect_uri> <code>
```
The output of the program is a JSON which should be copied into vault/secrets manager and which is used for first-time initialization of the Google OAuth token cache.
## OneDrive
Open the following URL in the browser:
```
https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/authorize?client_id=<client_id>&response_type=code&redirect_uri=<redirect_uri>&response_mode=query&scope=offline_access%20Files.ReadWrite%20Sites.ReadWrite.All&state=<any_random_state>
```
After consent is granted, the browser will redirect to a URL of the form:
```
<redirect_uri>?code=<code>&state=<supplied_state>&session_state=<some_guid>#
```
Note the above code value, switch to the directory where this repo is checked out and run the following:
```
node . onedrive <client_id> <client_secret> <redirect_uri> <code> <tenant_id>
```
The output of the program will contain a couple of lines in the beginning (to be ignored) and then the token cache JSON:
```
[Thu, 27 Jun 2024 13:46:15 GMT] : [] : @azure/msal-node@2.9.2 : Info - acquireTokenByCode called
[Thu, 27 Jun 2024 13:46:15 GMT] : [<some_guid>] : @azure/msal-node@2.9.2 : Info - Building oauth client configuration with the following authority: https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token.
<token_cache_json>
```
The token cache JSON should be copied into vault/secrets manager and is used for first-time initialization of the MSAL OAuth token cache.

# Token cache initial value generation
## Google
Open the following URL in the browser:
```
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=<client_id>&redirect_uri=<redirect_uri>&scope=https://www.googleapis.com/auth/spreadsheets&state=<any_random_value>&response_type=code&include_granted_scopes=true&prompt=consent
```
The browser will redirect to a URL of the form:
```
<redirect_uri>?state=<supplied_state>&code=<code>&scope=https://www.googleapis.com/auth/spreadsheets
```
Note the above code value, switch to the directory where this repo is checked out and run the following:
```
node . google <client_id> <client_secret> <redirect_uri> <code>
```
The output of the program is a JSON which should be copied into vault/secrets manager and which is used for first-time initialization of the Google OAuth token cache.

using Packckage.json
----------------------
npm install ( to install dependencies specified in package.json)

tsc --init (Create tsconfig.json file manually. Before that make sure typescript is installed : npm install typescript -g)


Using Angular CLI boilerplate
----------------------------------
npm install @nagular/cli

ng new Project  (all relevant files/folders including JSON file will get created)


aws4 and @types/aws4 in package.json
-----------------------------------
aws4 is used to sign API requests with Google Auth Id and @types/aws4 is the type definiton for aws4


IAM authentication of API gateway
--------------------------------------
https://aws.amazon.com/premiumsupport/knowledge-center/iam-authentication-api-gateway/

tilde (~) and caret (^) in Package.json
--------------------------------------
npm uses the tilde (~) and caret (^) to designate which patch and minor versions to use respectively.
So if you see ~1.0.2 it means to install version 1.0.2 or the latest patch version such as 1.0.4. 
If you see ^1.0.2 it means to install version 1.0.2 or the latest minor or patch version such as 1.1.0.


Useful VSCode Extensions for Angular : (Angular Snippets by Jhon papa)
----------------------------------------
https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2


https://medium.com/frontend-coach/7-must-have-visual-studio-code-extensions-for-angular-af9c476147fd


@injectable decorator for Services
---------------------------------------
https://blog.ninja-squad.com/2016/12/08/angular-injectable/


Build the app
--------------
npm run build:watch (will create a public folder)

Run Node Server locally
--------------------
npm run start  (starts local-server.js)


augury extension
-------------------
Add augury extension to chrome to view the component hierarchy in developer tools

stopPrpagation , preventDefault
-----------------------------------
https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb

 JIT V/S AOT
--------------------
https://dev.to/imbilal1/what-are-aot-jit-compiler-in-angular-2-488h


Google API Csonsole
-------------------
https://console.cloud.google.com/apis/

oAuthClient Details
--------------------------
id : 698489830298-9lmhlujap77d743lsumvgmkmq69sanm0.apps.googleusercontent.com

secret : c8f-q1SSF1oZzDvBopp5WYaw

 Features
 ---------
 ** Add/Update/Delete/Get Note - CRUD (Create, Retrieve, Update, Delete)
 ** Infinite Scrolling to implement pagination for dynamoDB
 ** Update Notes component with addition/deletion/updation of note
 ** Spinner - Add, Get , update , delete (isLoading)
 ** No Notes Found
 
 TO DO After testing locally
 -------------------------------
 prod build
 Check in Codecommit
System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    paths: {
        // paths serve as alias
        'bower:*': 'bower_components/*'
    },
    map: {
        // our app is within the app folder
        app: 'app',
        // Angular Modules
        "angular": "bower:angular/angular.js",
        "angular-route":"bower:angular-route/angular-route.js",
        "angular-animate": "bower:angular-animate/angular-animate.js",
        "angular-aria": "bower:angular-aria/angular-aria.js",
        "angular-material": "bower:angular-material/angular-material.js",
        "angular-messages": "bower:angular-messages/angular-messages.js",
        "angular-material-icons": "bower:angular-material-icons/angular-material-icons.js"
    },
    packages: {
        app: {
            main: './app.js',
            defaultExtension: 'js'
        }
    },
    meta: {
        'angular': {
            format: 'global',
            exports: 'angular'
        },
        'angular-route':{
            "deps":[
                "angular"
            ]
        }
    }

});
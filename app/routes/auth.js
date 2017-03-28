var url = require('url');

module.exports = function (app, passport) {
    
    // =====================================
    // Starts Azure authentication/authorization
    // =====================================
    app.get('/auth/azureOAuth', 
        passport.authenticate('azureoauth', { 
            successRedirect: '/auth/azureOAuth/callback',
            failureRedirect: '/' 
        })
    );
    
    // =====================================
    // cache and handle access token and refresh token as returned from AAD. 
    // This presumes that the app's redirectURL is set in AAD as
    // 'http://{host}/auth/azureOAuth/callback' 
    app.get('/auth/azureOAuth/callback', 
        passport.authenticate('azureoauth', { 
            // failWithError: true,
            failureRedirect: '/' 
        }),
        function (req, res) {
            console.dir(passport.user.tokens);
            res.render('apiTasks', { user : passport.user });
    });
    
       
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};

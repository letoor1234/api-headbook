app.get("/user/login", function(req, res) {
    res.render("signin");
});
app.post('/user/login', function (req, res){
    passport.authenticate('local-login', function(err, user, info){
        if (err) return res.redirect("/");
        if (!user) return res.redirect('/');

        else {
            req.login(user, function(err) {
              if (err) return next(err);
              console.log("Request Login supossedly successful.");
              return res.redirect('/admin/filter');
            });
        }
    })(req, res);
});
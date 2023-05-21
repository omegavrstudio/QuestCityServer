const AuthRoutes = require('./UsersAuth');

module.exports = function(app, db) {
    app.get('/', (req, res) => {
        res.json({
            "success": false,
            "message": "Неизвестный запрос",
        });
    });

    AuthRoutes(app, db);
};
const UserSchema = require('../models/UserAuth');

module.exports = function(app, db) {

    // TODO Дописать валидацию номера телефона, пароля и никнейма
    app.post('/registration', (req, res) => {
        
        if(req.body.phone === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует номер телефона",
            });
        }

        if(req.body.nickname === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует никнейм",
            });
        }
        if(req.body.password === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует пароль",
            });
        }

        UserSchema.findOne({"phone": req.body.phone})
        .then((user)=>{
            if(user === null){

                var newUser = new UserSchema({
                    dateRegistration: new Date(),
                    isOnline: false,
                    avatarId: "https://w7.pngwing.com/pngs/590/664/png-transparent-computer-icons-share-icon-avatar-icon-face-monochrome-head.png",
                    nickname: req.body.nickname,
                    phone: req.body.phone
                });
            
                newUser.setPassword(req.body.password);
                newUser.save();
  
                return res.status(200).send({
                    "success": true,
                    "message": "Пользователь успешно зарегистрирован",
                });

            }else{
                res
                .status(500)
                .json({
                    "success": false,
                    "message": "По данному номеру телефона уже зарегистрирован пользователь",
                });
            }


        })
        .catch((err)=>{
            res
            .status(500)
            .json({
                "success": false,
                "message": "Ошибка поиска в БД",
            });
        });
    });





    app.post('/login', (req, res) => {
        
        if(req.body.phone === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует номер телефона",
            });
        }

        if(req.body.password === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует пароль",
            });
        }

        UserSchema.findOne({"phone": req.body.phone})
        .then((user)=>{
            if(user === null){
                return res.status(500).send({
                    "success": false,
                    "message": "Пользователь не найден",
                });
            }else{

                if(user.validPassword(req.body.password)){
                    res
                    .status(200)
                    .json({
                        "success": true,
                        "message": "Успешный вход",
                    });
                }else{
                    res
                    .status(200)
                    .json({
                        "success": false,
                        "message": "Неправильный пароль!",
                    });
                }

            }


        })
        .catch(()=>{
            res
            .status(500)
            .json({
                "success": false,
                "message": "Ошибка поиска в БД",
            });
        });
    });


    
    // TODO Дописать join проверку по JWL
    app.post('/join', (req, res) => {
        
        if(req.body.userId === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует номер телефона",
            });
        }

        UserSchema.findById(req.body.userId)
        .then((user)=>{
            if(user === null){
                return res.status(500).send({
                    "success": false,
                    "message": "Пользователь не найден",
                });
            }else{
                // TODO Предусмотреть вход с нескольких устройств
                user.isOnline = true;
                user.save();
                res
                .status(200)
                .json({
                    "success": true,
                    "message": "Успешный вход",
                });

            }

        }).catch(()=>{
            res
            .status(500)
            .json({
                "success": false,
                "message": "Ошибка поиска в БД",
            });
        });
    });


     // TODO Дописать leave проверку по JWL
     app.post('/leave', (req, res) => {
        
        if(req.body.userId === "")  {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Отсутвует пользователь",
            });
        }

        UserSchema.findById(req.body.userId)
        .then((user)=>{
            if(user === null){
                return res.status(500).send({
                    "success": false,
                    "message": "Пользователь не найден",
                });
            }else{
    
                user.isOnline = false;
                user.save();
                res
                .status(200)
                .json({
                    "success": true,
                    "message": "Успешный выход",
                });

            }

        }).catch(()=>{
            res
            .status(500)
            .json({
                "success": false,
                "message": "Ошибка поиска в БД",
            });
        });
    });
};

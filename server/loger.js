


module.exports = function(stringLog) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let hours = ("0" + (date_ob.getHours())).slice(-2);
        let minutes = ("0" + (date_ob.getMinutes())).slice(-2);
        let seconds = ("0" + (date_ob.getSeconds())).slice(-2);
        console.log("[" + date + "." + month + "." + date_ob.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + "][Сервер] " + stringLog);
};
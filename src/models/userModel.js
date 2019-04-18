const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');



const userSchema = new Schema({
  email: {
    type:String,
    required: true, 
    // делаем поле уникальным, иначе не сохранит в базу
    unique: true
  },
  password:{
    type:String,
    required: true
  }
},
{timestamps: true}
);

// -------- Х Е Ш И Р О В А Н И Е   П А Р О Л Я  --------

// ОБРАБОТКА ЛЮБЫХ ОПЕРАЦИЙ С USEROM ПЕРЕД СОХРАНЕНИЕМ
userSchema.pre("save", function(next){

// ссылка на созданный НО НЕ сохраненный объект на базе конструктора userSchema
// В НЕМ УЖЕ НАБИТЫ ДАННЫЕ ОТ ПОЛЬЗОВАТЕЛЯ. EMAIL и PASSWORD
  const user = this;

// проверяем поле password МЕТОДЫ MONGOOSE
// isModified - проверяет поле на изменение
// isNew - проверяет новое ли поле 

// ЕСЛИ ПОЛЕ НЕ ИЗМЕНЯЕТСЯ ИЛИ НЕ ПОЛЕ НЕ НОВОЕ ТО ПЕРЕХОДИМ В ELSE
  if (user.isModified("password") || user.isNew) {

// ВЫЗЫВАЕМ МЕТОД БИБЛИОТЕКИ GENSALT который даст ключ шифрования и запишет его в sALT.
// передаем количество проходов хеширования 
    bcrypt.genSalt(10, (err, salt)=>{
      // обрабатываем ошибку и передаем в SAVE
      if (err)  return next(err); 

      // метод HASH хеширует с помощью созданного ключа 
      bcrypt.hash(user.password, salt, (err, hash) =>{
      // обрабатываем ошибку и передаем в SAVE
        if (err) return next(err); 
      // переписываем поле password. ставим новое значение  hash 
        user.password = hash;
      // передаем измененное поле дальше для сохранения в SAVE
        next();
      });

    });
  } 

// ПЕРЕДАЕМ ФУНКЦИЮ В SAVE
  else {
    return next();
  }
  
});



const User = mongoose.model('User', userSchema);

module.exports = User;

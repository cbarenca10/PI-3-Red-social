'use strict'

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Message = require('../models/message');

function probando(req, res){
    res.status(200).send({message: 'hola que tal =)' });
}

function saveMesagge(req, res){
    var params = req.body;

    if(!params.text || !params.receiver) res.status(200).send({message: 'Envia los datos necesarios' });

    var message = new Message();
    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();
    message.viewed = 'false';

    message.save((err, messageStored) => {
        if(err) res.status(500).send({message: 'Error en la peticion' });
        if(!messageStored) res.status(500).send({message: 'Error al enviar los mensajes.' });

        return res.status(200).send({message: messageStored});

    });
}

function getReceivedMessages(req, res){
    var userId = req.user.sub;

    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    // Lista para mostrar los contactos que te envian mensajes
    var itemsPerPage = 4;
    
    Message.find({receiver: userId}).populate('emitter', 'name surname _id nick image').paginate(page, itemsPerPage, (err, messages, total) => {
        if(err) res.status(500).send({message: 'Error en la peticion' });
        if(!messages) res.status(404).send({message: 'No hay mensages que mostar =( ' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            messages
        });
    });

}

function getEmmitMessages(req, res){
    var userId = req.user.sub;

    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    // Lista para mostrar los contactos que te envian mensajes
    var itemsPerPage = 4;
    
    Message.find({emitter: userId}).populate('emitter receiver', 'name surname _id nick image').paginate(page, itemsPerPage, (err, messages, total) => {
        if(err) res.status(500).send({message: 'Error en la peticion' });
        if(!messages) res.status(404).send({message: 'No hay mensages que mostar =( ' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            messages
        });
    });

}

function getUnviewedMessages(req, res){
    var userId = req.user.sub;

    Message.count({receiver:userId, viewed:'false'}).exec((err, count) => {
        if(err) res.status(500).send({message: 'Error en la peticion' });
        return res.status(200).send({
            'unviewed': count
        });

    });
}

function setViewedMessages(req, res){
    var userId = req.user.sub;

    Message.update({receiver:userId, viewed:'false'}, {viewed:'true'}, {"multi":true}, (err, messageUpdated) => {
        if(err) res.status(500).send({message: 'Error en la peticion' });
       return res.status(200).send({
        messages: messageUpdated
       });
    });
}

module.exports = {
    probando,
    saveMesagge,
    getReceivedMessages,
    getEmmitMessages,
    getUnviewedMessages,
    setViewedMessages
};
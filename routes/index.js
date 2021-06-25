'use strict';

const express = require('express');
const router = express.Router();
const ClassSurveyModel = require('../models/ClassSurveyModel');

router.get('/', async (req, res) => {
    const topicData = await ClassSurveyModel.getAllTopicData();
    const rankingData = await ClassSurveyModel.getAllRankingData();

    res.render('template', {
        locals: {
            title: 'Class Survey',
            data: topicData,
            rankings: rankingData
        },
        partials: {
            body: 'partials/home'
        }
    })
});

router.get('/error', async (req, res) => {
    const { error } = req.query;

    let errorMessage = error;
    if (!error) {
        errorMessage = 'No Error Message Defined';
    }
    res.render('template', {
        locals: {
            title: 'ERROR',
            error: errorMessage
        },
        partials: {
            body: 'partials/error' 
        }
    })
});

router.post('/update', async (req, res) => {
    let response

    for (let key in req.body) {
        response = await ClassSurveyModel.updateRanking(key, req.body[key])
    }

    if (response.rowCount !== 1) {
        res.redirect(`/error?error=${response}`)
    } else {
        res.redirect('/');

    }
});

module.exports = router;

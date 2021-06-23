'use strict';

const db = require('./conn');

class ClassSurveyModel {
    constructor(id, topic_name, topic_score) {
        this.id = id;
        this.topic_name = topic_name;
        this.topic_score = topic_score;
    }
    static async getAllTopicData() {
        try {
            const response = await db.any(
                `SELECT * FROM topics
                INNER JOIN rankings
                ON topics.topic_score = rankings.id
                ORDER BY topics.topic_name;`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error)
            return error;
        }
    }    
}

module.exports = ClassSurveyModel;
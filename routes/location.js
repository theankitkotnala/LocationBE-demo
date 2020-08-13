/**
 * File contains all the Location related routes
 */

/** Required Modules */
const express = require('express');
const router = express.Router();
const LocationService = require('./../services/location.service');

/**
 * @param city
 * @param range
 */
router.get('/location/:lat/:long/:range', (req, res) => {
    const source_lat = parseFloat(req.params.lat);
    const source_long = parseFloat(req.params.long);
    const range = parseInt(req.params.range);
    LocationService.getAllNearesestUsersInRange({ source_lat, source_long }, range, (error, users) => {
        if (error) {
            res.status(500)
                .json({
                    error
                })
        } else {
            res.status(200)
                .json({
                    status: 'success',
                    users
                })
        }
    })
});

module.exports = router;
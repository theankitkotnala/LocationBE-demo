/**
 * This is a Bussness layer for the location related routes
 */

/** Require Modules here */
const LocationDao = require('./../dao/location.dao');
const LocationUtility = require('./../utils/location.utils');

class LocationService {
    /**
     * Function to get all nearest 
     * users using Dao object
     * @param {*} source_city 
     * @param {*} range 
     * @param {*} cb 
     */
    async getAllNearesestUsersInRange({ source_lat, source_long }, range, cb = () => { }) {
        try {
            let { value, error } = await LocationDao.getAllUsers();
            if (value) {
                const usersWithinRange = LocationUtility.getAllLocationsWithinRange(value, { source_lat, source_long }, range)
                    .sort((a, b) => a.user_id - b.user_id);

                cb(null, usersWithinRange);
            } else {
                cb(error);
            }
        } catch (error) {
            cb({ type: 'error', ...error, location: { file: __filename, function: 'getAllNearesestUsersInRange' } });
        }
    }
}

module.exports = new LocationService();
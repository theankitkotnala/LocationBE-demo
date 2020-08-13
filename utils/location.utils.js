/**
 * File for creating all the Utility 
 * function for Location based Operations
 */

class LocationUtility {

    /** 
     * Method to fetch the locations within range 
     * @param {Array} destinations
     * @param {Object} source_city
     * @param {Number} range
     */
    getAllLocationsWithinRange (destinations, { source_lat, source_long }, range) {
         let withinRange = [];
        /** convert source location to radian */
        source_lat = this.toRadian(source_lat);
        source_long = this.toRadian(source_long);

        for (let i = 0; i < destinations.length; i++) {
            /** convert destination location to radian */
            let dest_lat = this.toRadian(destinations[i].latitude);
            let dest_long = this.toRadian(destinations[i].longitude);
            /** Calculate the distance */
            let distance = this.distanceBetweenTwoLocations({ source_lat, source_long, dest_lat, dest_long },'KM');
            /** Check for in range */
            if (distance <= range) withinRange.push(destinations[i]);
        }
        return withinRange;
    }

    /**
     * Function to Convert the into the Radian
     * @param { Float } degree
     */
    toRadian (degree) { 
        return degree * (Math.PI / 180) 
    }

    /**
     * Function to calculate the distance between 
     * two points on earth
     * @param { Object }
     *  { Radian } source_lat
     *  { Radian } source_long
     *  { Radian } dest_lat
     *  { Radian } dest_long
     * @param {String} radius_unit
     */
    distanceBetweenTwoLocations ({ source_lat, source_long, dest_lat, dest_long }, radius_unit) {
        let long_diff = dest_long - source_long;
        let lat_diff = dest_lat - source_lat;

        let cal = Math.pow(Math.sin(lat_diff / 2), 2)
            + Math.cos(source_lat) * Math.cos(dest_lat)
            * Math.pow(Math.sin(long_diff / 2), 2);

        if (radius_unit !== null && radius_unit !== undefined && typeof radius_unit === 'string') {
           switch (radius_unit.toLowerCase()) {
                case 'km' : radius_unit = 6371;
                    break;
                case 'miles' : radius_unit = 3956;
                    break;
                default : radius_unit = 6371;
            }
        } else {
            radius_unit = 6371;
        }
        // Radius of earth in kilometers 6371. Use 3956 for miles 
        return 2 * Math.asin(Math.sqrt(cal)) * radius_unit;
    }
}

module.exports = new LocationUtility();
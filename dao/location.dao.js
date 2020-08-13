const fs = require('fs');

class LocationDao {
    async getAllUsers() {
        try {
            const users = fs.readFileSync('customers.txt', {encoding:'utf8', flag:'r'}); 
            return  { value: JSON.parse(users) };
        } catch (error) {
            return { error: { type: 'error', ...error, location: { file: __filename, function: 'getAllUsers' } } }
        }
    }
}

module.exports = new LocationDao();
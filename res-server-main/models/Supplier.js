const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const supplierSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    phoneNumber: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    // location: {
    //     type: String,
    //     required: true
    // },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dollarExchangeRate: {
        type: Number,
        required: true
    },
    companyType: {
        type: String,
        enum: ["supplier", "manufacturer"],
        default: "supplier",
        required: [true, "Please enter your company type"],
    },
    roles: [{
        type: String,
        default: "Supplier"
    }],
    categories: [{
        type: String,
        required: true
    }],
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false,
    },
    
    status: {
        type: String,
        enum: ["Not approved", "Approved","On Hold", "Rejected"],
        default: "Not approved",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

// // Hash password before saving
// userSchema.pre("save", async function () {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// // Compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;

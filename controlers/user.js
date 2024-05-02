const Auth = require("../models/auth")

exports.getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await Auth.findOne({ _id: id })
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    const { userId, data } = req.body
    try {
        const user = await Auth.findOneAndUpdate({ _id: userId }, { $push: { address: data } }, { new: true });
        res.status(200).json({
            user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.updateUserAddress = async (req, res) => {
    const { user, updatedAddress, editAddress } = req.body
    try {
        const findUser = await Auth.findOne({ _id: user })
        if (!findUser) {
            res.status(400).json({
                success: false,
                message: "user not found",
                error: error.message
            })
        }
        const addressIndex = findUser.address.findIndex(address => address._id.toString() === editAddress);

        if (addressIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Address not found",
            });
        }
        findUser.address[addressIndex] = updatedAddress;

        await findUser.save();
        console.log(updatedAddress)

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            updatedAddress: updatedAddress
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

exports.deleteUserAddressById = async (req, res) => {
    const { id, addressId } = req.params
    console.log(id, addressId)
    try {
        const user = await Auth.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const index = user.address.findIndex(address => address._id.toString() === addressId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        user.address.splice(index, 1);
        await user.save()

        res.status(200).json({
            success: true,
            message: "address removed",
            user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}
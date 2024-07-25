"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserData = exports.updateUserData = exports.fetchUserData = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const apiError_1 = require("../utils/apiError");
const fetchUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = req;
    if (!authReq.user) {
        return next(new apiError_1.ApiError(403, 'User information not found'));
    }
    try {
        const userDoc = yield firebaseConfig_1.db.collection('users').doc(authReq.user.uid).get();
        if (!userDoc.exists) {
            return next(new apiError_1.ApiError(404, 'User not found'));
        }
        res.status(200).send(userDoc.data());
    }
    catch (error) {
        next(new apiError_1.ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
    }
});
exports.fetchUserData = fetchUserData;
const updateUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = req;
    if (!authReq.user) {
        return next(new apiError_1.ApiError(403, 'User information not found'));
    }
    // Ensure that data is a plain object
    const data = Object.assign({}, req.body);
    try {
        yield firebaseConfig_1.db.collection('users').doc(authReq.user.uid).set(data, { merge: true });
        res.status(200).send({ message: 'User data updated successfully' });
    }
    catch (error) {
        next(new apiError_1.ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
    }
});
exports.updateUserData = updateUserData;
const createUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = req;
    if (!authReq.user) {
        return next(new apiError_1.ApiError(403, 'User information not found'));
    }
    const { name, email } = req.body;
    try {
        // Ensure that data is a plain object
        const userData = { name, email, uid: authReq.user.uid };
        yield firebaseConfig_1.db.collection('users').doc(authReq.user.uid).set(userData);
        res.status(201).json({ message: 'User data created successfully' });
    }
    catch (error) {
        next(new apiError_1.ApiError(500, error instanceof Error ? error.message : 'An unknown error occurred'));
    }
});
exports.createUserData = createUserData;

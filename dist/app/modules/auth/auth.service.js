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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // // Hash the password before saving it in the database
    // const hashedPassword = await bcrypt.hash(payload.password, 10); // Adjust the salt rounds as needed
    // const userDataWithHashedPassword = {
    //   ...payload,
    //   password: hashedPassword,
    // };
    // const { password, ...result } = await prisma.user.create({
    //   data: userDataWithHashedPassword,
    // });
    const _a = yield prisma_1.default.user.create({ data: payload }), { password } = _a, result = __rest(_a, ["password"]);
    console.log(password);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const oneYearInSeconds = 31536000; // Number of seconds in one year
    const iatForOneYear = now + oneYearInSeconds; // Calculate the iat value for one year from now
    let accessToken;
    let refreshToken;
    if (result) {
        accessToken = jwtHelpers_1.jwtHelpers.createToken({
            role: result.role,
            userId: result.id,
            iat: iatForOneYear,
        }, config_1.default.jwt.secret, '365d');
        refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            role: result.role,
            userId: result.id,
            iat: iatForOneYear,
        }, config_1.default.jwt.refresh_secret, '365d');
    }
    return { result, refreshToken, accessToken };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Verify the password
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) && password !== isUserExist.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const oneYearInSeconds = 31536000; // Number of seconds in one year
    const iatForOneYear = now + oneYearInSeconds; // Calculate the iat value for one year from now
    const { id, role } = isUserExist;
    // Generate JWT tokens
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        role: role,
        userId: id,
        iat: iatForOneYear,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        role: role,
        userId: id,
        iat: iatForOneYear,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        userData: isUserExist,
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    signUp,
    login,
};

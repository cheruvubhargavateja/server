import bcrypt from "bcrypt";

export async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds (cost factor)
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

// Function to verify a password
export async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error verifying password:', err);
        throw err;
    }
}
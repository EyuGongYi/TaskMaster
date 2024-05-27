import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
	bcrypt.compareSync(plain, hashed);
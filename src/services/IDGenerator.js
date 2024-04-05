class IDGenerator {
    static CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static DIGITS = "0123456789";

    static CreateID() {
        let randomString = '';

        for (let i = 0; i < 4; i++) {
            const charIndex = Math.floor(Math.random() * IDGenerator.CHARACTERS.length);
            randomString += IDGenerator.CHARACTERS.charAt(charIndex);
        }

        for (let i = 0; i < 3; i++) {
            const digitIndex = Math.floor(Math.random() * IDGenerator.DIGITS.length);
            randomString += IDGenerator.DIGITS.charAt(digitIndex);
        }

        return randomString;
    }

    static IDBook() {
        return 'B' + IDGenerator.CreateID();
    }

    static IDOrder() {
        return 'O' + IDGenerator.CreateID();
    }
}

module.exports = IDGenerator;
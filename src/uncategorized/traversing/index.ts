const keypad: Record<string, string> = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
};

function letterCombinations(digits: string): string[] {

    if (digits.length === 0) return [];

    const answer: string[] = [];

    function solve(index: number, current: string): void {

        if (index === digits.length) {

            answer.push(current);

            return;
        }

        const letters = keypad[digits[index]];

        for (const letter of letters) {

            solve(
                index + 1,
                current + letter
            );
        }
    }

    solve(0, "");

    return answer;
}

console.info(letterCombinations("23"));
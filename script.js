// Define the grade scale
const gradeScale = {
    'A+': 4.33,
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 0.67,
    'F': 0.0,
};

// Get the elements from the HTML
const addSubjectButton = document.getElementById('add-subject');
const calculateButton = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const subjectListDiv = document.getElementById('subject-list');

// Initialize subject count
let subjectCount = 0;

// Function to create a new subject input field
function createSubjectInput() {
    subjectCount++;
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');
    subjectDiv.innerHTML = `
        <label for="subject${subjectCount}">Subject ${subjectCount}:</label>
        <select id="subject${subjectCount}" class="grade">
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
        </select>
        <label for="credits${subjectCount}">Credits:</label>
        <input type="number" id="credits${subjectCount}" class="credits" min="0.5" step="0.5" value="3">
        <button class="delete-subject" data-subject="${subjectCount}">Delete</button>
    `;

    // Event listener for the delete button
    const deleteButton = subjectDiv.querySelector('.delete-subject');
    deleteButton.addEventListener('click', () => {
        subjectDiv.remove();
    });

    subjectListDiv.appendChild(subjectDiv);
}

// Event listener to add a new subject input
addSubjectButton.addEventListener('click', () => {
    createSubjectInput();
});

// Calculate GPA when the "Calculate GPA" button is clicked
calculateButton.addEventListener('click', () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const gradeSelects = document.querySelectorAll('.grade');
    const creditInputs = document.querySelectorAll('.credits');

    gradeSelects.forEach((select, index) => {
        const selectedGrade = select.value;
        const credits = parseFloat(creditInputs[index].value);

        if (selectedGrade in gradeScale) {
            const gradePoints = gradeScale[selectedGrade];
            totalCredits += credits;
            totalGradePoints += gradePoints * credits;
        }
    });

    if (totalCredits > 0) {
        const gpa = (totalGradePoints / totalCredits).toFixed(2);
        resultDiv.textContent = `Your GPA is: ${gpa}`;
    } else {
        resultDiv.textContent = 'No valid grades entered. GPA cannot be calculated.';
    }
});


// Initial creation of a subject input field
createSubjectInput();

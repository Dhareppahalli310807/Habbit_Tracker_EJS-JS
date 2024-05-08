# Habbit_Tracker_EJS-JS

This is a web application for tracking daily habits. It allows users to create habits, mark them as done or not done for each day, and view their habits in different views like the habits view and the calendar view.

## Features

- Add Habit: Users can add new habits with a name.
- Delete Habit: Users can delete existing habits.
- Update Habit Status: Users can mark habits as done, not done, or none for each day.
- View Habits: Users can view their habits in both the habits view and the calendar view.
- Calendar View: Users can view their habits in a calendar format, showing their status for each day.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript (ES6)
  - Font Awesome for icons
  - Moment.js for date manipulation
- **Backend**:
  - Node.js with Express.js for server-side logic
  - MongoDB with Mongoose for database management
  - Moment.js for date manipulation

## Setup Instructions

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Dhareppahalli310807/Habbit_Tracker_EJS-JS
```

2. Install dependencies:

```bash
npm i && npm i -D
```

3. Start the server:

```bash
npm run dev
node server.js
```

4. Open your web browser and go to http://localhost:3000 to view the application.

## How to Use

1. Adding a Habit:

   - Click on the "Add a habit" button.
   - Enter the name of the habit and submit the form.

2. Deleting a Habit:

   - Click on the delete button next to the habit you want to delete.

3. Updating Habit Status:

   - In the habits view, click on the "Done", "Not Done", or "None" button next to the habit.
   - In the calendar view, click on any date to open the update modal, then select the status.

4. Viewing Habits:

   - Click on the "Habits View" or "Calendar View" link in the header to switch between views.

## Credits

This project was created by Dhareppa Halli.

## License

This project is licensed under the MIT License.

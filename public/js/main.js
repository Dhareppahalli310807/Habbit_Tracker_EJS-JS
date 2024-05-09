// getting elements
const addHabitOpenModal = document.getElementById('add_habit');
const addHabitModal = document.getElementById('add_habit_form_div');
const addHabitCloseModal = document.getElementById('close');
const addHabitForm = document.getElementById('add_habit_form');
const btnDone = document.querySelectorAll('.btn_done');
const btnNotDone = document.querySelectorAll('.btn_not_done');
const btnNone = document.querySelectorAll('.btn_none');
const btnDelete = document.querySelectorAll('.btn_delete');
const updateModal = document.getElementById('update_habit_status_div');
const updateModalClose = document.getElementById('update_close');
const updateDone = document.getElementById('update_done');
const updateNotDone = document.getElementById('update_not_done');
const updateNone = document.getElementById('update_none');
const btnDay = document.querySelectorAll('.day_div');

// add habit modal open
if (addHabitOpenModal) {
  addHabitOpenModal.addEventListener('click', () => {
    addHabitModal.style.visibility = 'visible';
    addHabitModal.style.opacity = '1';
    addHabitModal.style.transform = 'translate(-50%,-60%)';
  });
}
// add habit modal close
if (addHabitCloseModal) {
  addHabitCloseModal.addEventListener('click', () => {
    addHabitModal.style.visibility = 'hidden';
    addHabitModal.style.opacity = '0';
    addHabitModal.style.transform = 'translate(-50%,-50%)';
  });
}
// send the post request to api at 'http://localhost:3000/'
if (addHabitForm) {
  addHabitForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
      const habitName = e.target.querySelector('#add_habit_input').value.trim();
      console.log(habitName);
      const res = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habitName: habitName }),
      });
      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
    e.target.querySelector('#add_habit_input').value = ''; // Reset the input field
  });
}

// update the habit status by sending post request at 'http:localhost:3000/update/:habitId'
btnDone.forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      const habitId = btn.dataset.habitId;
      const url = `/update/${habitId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'done' }), // update status to done
      });

      if (res.ok) {
        window.location.href = '/'; //reload the page to see the changes
      }
    } catch (error) {
      console.log(error);
    }
  });
});
btnNotDone.forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      const habitId = btn.dataset.habitId;
      const url = `/update/${habitId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'not done' }), //update the status to not done
      });

      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  });
});
btnNone.forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      const habitId = btn.dataset.habitId;
      const url = `/update/${habitId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'none' }), //update status to none
      });

      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  });
});
// delete habit by sending get request to 'http://localhost:8080/delete/:habitId'
btnDelete.forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      const habitId = btn.dataset.habitId;
      const url = `/delete/${habitId}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  });
});
// update modal in calendat view
// update modal close
if (updateModalClose) {
  updateModalClose.addEventListener('click', () => {
    updateModal.style.visibility = 'hidden';
    updateModal.style.opacity = '0';
    updateModal.style.transform = 'translate(-50%,-50%)';
  });
}
// variable to store habitStatusId for updating its status
let habitStatusId;
// open the update modal when clicking on any of the date button
btnDay.forEach((btn) => {
  btn.addEventListener('click', () => {
    // storing the id from dataset
    habitStatusId = btn.dataset.habitStatusId;
    // open the modal
    updateModal.style.visibility = 'visible';
    updateModal.style.opacity = '1';
    updateModal.style.transform = 'translate(-50%,-60%)';
  });
});
// three buttons each update the habit status and hide the modal and reload the calendar view
if (updateDone) {
  updateDone.addEventListener('click', async () => {
    try {
      const url = `/calenderView/update/${habitStatusId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'done' }),
      });

      if (res.ok) {
        window.location.href = '/calenderView';
      }
    } catch (error) {
      console.log(error);
    }
    updateModal.style.visibility = 'hidden';
    updateModal.style.opacity = '0';
    updateModal.style.transform = 'translate(-50%,-50%)';
  });
}
if (updateNotDone) {
  updateNotDone.addEventListener('click', async () => {
    try {
      const url = `/calenderView/update/${habitStatusId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'not done' }),
      });

      if (res.ok) {
        window.location.href = '/calenderView';
      }
    } catch (error) {
      console.log(error);
    }
    updateModal.style.visibility = 'hidden';
    updateModal.style.opacity = '0';
    updateModal.style.transform = 'translate(-50%,-50%)';
  });
}
if (updateNone) {
  updateNone.addEventListener('click', async () => {
    try {
      const url = `/calenderView/update/${habitStatusId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'none' }),
      });

      if (res.ok) {
        window.location.href = '/calenderView';
      }
    } catch (error) {
      console.log(error);
    }
    updateModal.style.visibility = 'hidden';
    updateModal.style.opacity = '0';
    updateModal.style.transform = 'translate(-50%,-50%)';
  });
}

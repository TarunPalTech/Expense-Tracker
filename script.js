document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expensePrice = document.getElementById("expense-price");
  const listItems = document.getElementById("list-items");
  const emptyMessage = document.getElementById("empty-message");
  const totalPrice = document.getElementById("total-price");

  let contentBox = JSON.parse(localStorage.getItem("contentBox")) || [];

  renderExpenses();
  updateTotalPrice();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expensePrice.value.trim());
    // form always submitted values in the form of strings whether the type is int or float.

    const expense = {
      id: Date.now(),
      name: name,
      amount: amount,
    };
    contentBox.push(expense);
    expenseName.value = "";
    expensePrice.value = "";
    saveTask();
    listItems.innerHTML = "";
    renderExpenses();
    updateTotalPrice();
  });

  function renderExpenses() {
    contentBox.forEach((expense) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <span>${expense.name} - ${expense.amount}</span>
          <button class="bgred" data-id="${expense.id}">delete</button>
          `;
      listItems.appendChild(div);
    });
  }

  function updateTotalPrice() {
    let totalExpense = 0;
    totalExpense = calculateTotalPrice();
    totalPrice.innerHTML = `<span>Total:</span> ${totalExpense} Rs`;
  }
  function calculateTotalPrice() {
    return contentBox.reduce((sum, expense) => sum + expense.amount, 0);
  }

  listItems.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const id = parseInt(event.target.getAttribute("data-id"));
      contentBox = contentBox.filter((content) => content.id !== id);
      saveTask();
      listItems.innerHTML = "";
      renderExpenses();
      updateTotalPrice();
    }
  });
  console.log(contentBox);

  function saveTask() {
    localStorage.setItem("contentBox", JSON.stringify(contentBox));
  }

  function getTotalExpense() {}
});

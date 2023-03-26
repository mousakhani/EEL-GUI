window.onload = function () {
  var input_factor = document.getElementById("factor");
  var total_number = document.getElementById("total_number");
  var excel_data = "";

  async function get_data() {
    var returned_data = "";
    await eel
      .get_excel_data()()
      .then((res) => {
        returned_data = res;
      });
    return returned_data;
  }
  input_factor.focus();
  async function update_table(items = null) {
    total_number.value = await eel.get_counter()();
    table.innerHTML = `<div class="row head">
            <span class="cell">col 3</span>
            <span class="cell">col 4</span>
            <span class="cell">col 5</span>
          </div>`;
    if (items !== null) {
      excel_data = items;
    } else {
      excel_data = await get_data();
    }
    excel_data.map((item) => {
      table.innerHTML += `<div class="row">
          <span class="cell">${item[0] ? item[0] : ""}</span>
          <span class="cell">${item[1] ? item[1] : ""}</span>
          <span class="cell">${item[2] ? item[2] : ""}</span>
          <span class="cell">${item[3] ? item[3] : ""}</span>
          <span class="cell">${item[4] ? item[4] : ""}</span>
        </div>`;
    });
  }
  update_table();

  input_factor.addEventListener("keypress", async function (e) {
    if (e.key == "Enter") {
      e.preventDefault();
      var input_data = input_factor.value;
      if (input_data.substr(0, 1) == "*") {
        input_factor.value = "";
        var dd = await get_data();
        var found_items = [];
        dd.forEach((element) => {
          if (element[0] == input_data.substr(1)) {
            found_items.push(element);
          }
        });
        update_table(found_items);
      } else if (input_data == "") {
        update_table();
      } else {
        var d = await eel.input_check(input_data)();
        if (d == true) {
          update_table();
          total_number.value = await eel.get_counter()();
          input_factor.className += " " + "success";
          setTimeout(function () {
            input_factor.classList.remove("success");
          }, 100);
          input_factor.value = "";
        } else {
          input_factor.className += " " + "error";
          setTimeout(function () {
            input_factor.classList.remove("error");
          }, 2000);
        }
      }
    }
  });
};

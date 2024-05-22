document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", (event) => {
    const button = event.relatedTarget;

    document.querySelector("#firstNameEdit").focus();

    document.querySelector("#id").value = button.dataset.id;
    document.querySelector("#firstNameEdit").value = button.dataset.firstname;
    document.querySelector("#lastNameEdit").value = button.dataset.lastname;
    document.querySelector("#usernameEdit").value = button.dataset.username;
    document.querySelector("#mobileEdit").value = button.dataset.mobile;
    document.querySelector("#isAdminEdit").value = button.dataset.isadmin === "true";
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

async function editUser(e) {
  e.preventDefault();

  const formData = new FormData(document.querySelector("#editUserForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      console.error(resText);
      throw new Error(resText);
    }
  }
  catch (error) {
    e.target.querySelector("#erorMessage").innerText = "Cannot update user";
    console.error(error);
  }
}

async function deleteUser(id) {
  try {
    let res = await fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
      let toastBody = document.querySelector(".toast .toast-body");
      toastBody.innerText = "Cannot delete user";
      toast.show();
    }
  }
  catch (error) {
    console.error(error);
  }
}

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log(e.target.dataset.id);
        console.log("Confirm");
        deleteUser(e.target.dataset.id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

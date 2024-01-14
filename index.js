//creating a const to represent my mockAPI url
const mock_API =
  "https://65a30b08a54d8e805ed35e8b.mockapi.io/karaokeContestants";

// console.log(mock_API); //logging out the link to make sure it works

// $.get(`${mock_API}/51`).then((data) => {
//   console.log(data);
// }); //use to test that the API is returning results

// building the table and appending it to the tbody from the html file
// using a get to retrieve the results of the api and iterating over that to insert into the table
// inserting a button into the table to delete
$.get(mock_API).then((data) => {
  data.map((contestant) => {
    $("tbody").append(
      $(`
        <tr>
          <td>${contestant.id}</td>
          <td>${contestant.contestantName}</td>
          <td>${contestant.songTitle}</td>
          <td>
            <button id="delete" onclick="deleteContestant(${contestant.id})">🗑</button>
          </td>
        </tr>
      `)
    );
  });
});

//creating the addContestant function which uses a post to add a contestant to the api,
//  associated to the Add Contestant button from the html file
function addContestant() {
  $.post(mock_API, {
    contestantName: $("#contestantName").val(),
    songTitle: $("#songTitle").val(),
  });
}

// creating the deleteContestant function which uses a delete to remove a contestant by id,
// associated to the trash can delete button that's inserted above
function deleteContestant(id) {
  $.ajax(`${mock_API}/${id}`, {
    type: "DELETE",
  });
  // set a delay so the delete can complete, set on a delay of 500 ms after which the page refreshes
  setTimeout(() => {
    location.reload();
  }, 500);
}

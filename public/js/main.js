$(document).ready(function() {
    $('#userTable').DataTable();

    // Submit form to add a new user
    $('#addUserForm').submit(function(e) {
        e.preventDefault();
        const name = $('input[name="name"]').val();
        const email = $('input[name="email"]').val();
        const age = $('input[name="age"]').val();

        $.ajax({
            url: '/add-user',
            method: 'POST',
            data: { name: name, email: email, age: age },
            success: function(response) {
                alert('User added successfully!');
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert('Error adding user!');
            }
        });
    });

    // Edit button click
    $('#edit-btn').click(function() {
        const id = $(this).data('id');
        const row = $(this).closest('tr');
        const name = row.find('td:eq(1)').text();
        const email = row.find('td:eq(2)').text();
        const age = row.find('td:eq(3)').text();

        $('#edit-id').val(id);
        $('#edit-name').val(name);
        $('#edit-email').val(email);
        $('#edit-age').val(age);

        $('#editModal').show();
    });

    // Submit form to update user
    $('#editUserForm').submit(function(e) {
        e.preventDefault();
        const id = $('#edit-id').val();
        const name = $('#edit-name').val();
        const email = $('#edit-email').val();
        const age = $('#edit-age').val();

        $.ajax({
            url: '/update-user',
            method: 'POST',
            data: { id: id, name: name, email: email, age: age },
            success: function(response) {
                alert('User updated successfully!');
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert('Error updating user!');
            }
        });
    });

    // Delete button click
    $('#delete-btn').click(function() {
        const id = $(this).data('id');
        if (confirm('Are you sure you want to delete this user?')) {
            $.ajax({
                url: '/delete-user',
                method: 'POST',
                data: { id: id },
                success: function(response) {
                    alert('User deleted successfully!');
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    alert('Error deleting user!');
                }
            });
        }
    });
});

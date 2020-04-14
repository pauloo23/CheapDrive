$('#login-modal').on('shown.bs.modal', function() {
        $(document).off('focusin.modal');
    });
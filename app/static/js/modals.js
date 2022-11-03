const linkList = ['prof-link', 'personal-link', 'socials-link',
             'star-orange', 'star-red', 'star-pink',
             'star-blue', 'star-green', 'star-turquoise', 'star-purple']
const modalNames = ['professinalModal', 'personalModal', 'contactsModal',
              'documentationModal', 'weaponsModal', 'economyModal',
              'donateModal', 'questsModal', 'soloModal', 'factionsModal']
var modalList = []

modalNames.forEach(modalName => {
    var Modal = new bootstrap.Modal(document.getElementById(modalName));
    modalList.push(Modal);
});

linkList.forEach(link => {
    (document.getElementById(link)).addEventListener('click', function() {
        var Modal = new bootstrap.Modal(document.getElementById(modalNames[linkList.indexOf(link)]));
        Modal.show();
    });
});
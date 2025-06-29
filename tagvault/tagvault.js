// tagvault.js

// Load server data from JSON and display in table
fetch('vault.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('serverTable');
    data.forEach(server => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${server.tagImg}" alt="tag" style="max-height: 30px;"></td>
        <td>${server.memberCount}</td>
        <td>${server.name}</td>
        <td><a href="${server.invite}" target="_blank">Invite</a></td>
        <td>${server.serverId}</td>
      `;
      table.appendChild(row);
    });
  });

// Search filter
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll('#serverTable tr');
  rows.forEach(row => {
    const name = row.children[2]?.textContent?.toLowerCase() || "";
    row.style.display = name.includes(filter) ? '' : 'none';
  });
});

// Modal handlers
const removalModal = document.getElementById('removalModal');
const requestRemove = document.getElementById('requestRemove');
const closeModal = document.getElementById('closeModal');

requestRemove.onclick = () => removalModal.style.display = 'flex';
closeModal.onclick = () => removalModal.style.display = 'none';

const submitModal = document.getElementById('submitModal');
const submitBtn = document.getElementById('submitServerBtn');
const closeSubmitModal = document.getElementById('closeSubmitModal');

submitBtn.onclick = () => submitModal.style.display = 'flex';
closeSubmitModal.onclick = () => submitModal.style.display = 'none';

// Submit server
const submitForm = document.getElementById('submitForm');
submitForm.onclick = () => {
  const name = document.getElementById('serverName').value;
  const serverId = document.getElementById('serverId').value;
  const invite = document.getElementById('serverInvite').value;
  const memberCount = document.getElementById('memberCount').value;
  const tagImg = document.getElementById('tagImg').value;

  const newServer = { name, serverId, invite, memberCount, tagImg };

  fetch('pendingVault.json')
    .then(res => res.json())
    .then(pending => {
      const alreadyExists = pending.some(s => s.serverId === serverId);
      if (alreadyExists) return alert('Already submitted.');

      pending.push(newServer);
      alert('Server submitted for approval. (Note: Save not persistent without backend)');
    });
};

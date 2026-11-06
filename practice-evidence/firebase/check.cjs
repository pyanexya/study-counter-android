const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const assert = require('node:assert/strict');

initializeApp({ projectId: 'demo-study', storageBucket: 'demo-study.appspot.com' });

(async () => {
  console.log('LOCAL EMULATORS ONLY - no cloud project, no billing');

  const user = await getAuth().createUser({ email: 'student@example.test', password: 'LocalDemoOnly123!' });
  assert.equal((await getAuth().getUser(user.uid)).email, 'student@example.test');
  console.log('PASS Authentication: createUser and getUser');

  const ref = getFirestore().doc('users/' + user.uid + '/notes/first');
  await ref.set({ text: 'My first Firebase note' });
  assert.equal((await ref.get()).data().text, 'My first Firebase note');
  console.log('PASS Firestore: write and read note');

  const file = getStorage().bucket().file('users/' + user.uid + '/hello.txt');
  await file.save('Hello Firebase Storage');
  const [bytes] = await file.download();
  assert.equal(bytes.toString(), 'Hello Firebase Storage');
  console.log('PASS Storage: upload and download file');
  console.log('3 checks passed. Admin SDK used; Security Rules are not tested.');

})().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) });

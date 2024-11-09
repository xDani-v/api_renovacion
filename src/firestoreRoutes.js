const express = require('express');
const router = express.Router();
const db = require('./firebaseConfig');
const { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } = require('firebase/firestore');

// Ruta para agregar un documento a la colección 'usuarios'
router.post('/usuarios/add', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'usuarios'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los documentos de la colección 'usuarios'
router.get('/usuarios/getAll', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un documento de la colección 'usuarios' por ID
router.get('/usuarios/get/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'usuarios', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un documento de la colección 'usuarios' por ID
router.put('/usuarios/update/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'usuarios', req.params.id);
    await updateDoc(docRef, req.body);
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un documento de la colección 'usuarios' por ID
router.delete('/usuarios/delete/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'usuarios', req.params.id);
    await deleteDoc(docRef);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, clave } = req.body;

    // Verificar que el correo y la clave estén presentes
    if (!correo || !clave) {
      return res.status(400).json({ error: 'Correo y clave son requeridos' });
    }

    // Buscar el usuario por correo y clave
    const q = query(collection(db, 'usuarios'), where('correo', '==', correo), where('clave', '==', clave));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).json({ error: 'Correo o clave inválidos' });
    }

    // Obtener el primer documento (usuario)
    const userDoc = querySnapshot.docs[0];

    // Devolver el ID del usuario
    res.json({ id: userDoc.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta para agregar un documento a la colección 'datos'
router.post('/datos/add', async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'datos'), req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los documentos de la colección 'datos'
router.get('/datos/getAll', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'datos'));
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un documento de la colección 'datos' por ID
router.get('/datos/get/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'datos', req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un documento de la colección 'datos' por ID
router.put('/datos/update/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'datos', req.params.id);
    await updateDoc(docRef, req.body);
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un documento de la colección 'datos' por ID
router.delete('/datos/delete/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'datos', req.params.id);
    await deleteDoc(docRef);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
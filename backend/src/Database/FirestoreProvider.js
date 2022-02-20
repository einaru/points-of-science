function withID(doc) {
  return { ...doc.data(), id: doc.id };
}

export default class FirestoreProvider {
  constructor(firestore, collectionPath) {
    this.db = firestore;
    this.path = collectionPath;
  }

  get collection() {
    return this.db.collection(this.path);
  }

  async getAll() {
    const data = [];
    await this.collection.get().then((query) => {
      query.docs.forEach((doc) => {
        data.push(withID(doc));
      });
    });
    return data;
  }

  async getManyByQuery(queryFn) {
    const data = [];
    await queryFn(this.collection)
      .get()
      .then((query) => {
        query.docs.forEach((doc) => {
          data.push(withID(doc));
        });
      });
    return data;
  }

  async getByID(id) {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? withID(doc) : null;
  }

  async add(data) {
    const ref = await this.collection.add(data);
    const doc = await ref.get();
    return withID(doc);
  }

  async set(id, data, merge = true) {
    await this.collection.doc(id).set(data, { merge });
    return this.getByID(id);
  }

  async update(id, data, merge = true) {
    await this.collection.doc(id).update(data, { merge });
    return this.getByID(id);
  }

  async delete(id) {
    await this.collection.doc(id).delete();
  }
}

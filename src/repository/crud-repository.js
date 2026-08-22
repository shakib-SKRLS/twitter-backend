class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.error("Error finding document:", error);
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.error("Error finding documents:", error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    async destroy(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
}

module.exports = CrudRepository;
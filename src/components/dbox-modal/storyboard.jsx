export class Location {
    constructor (x, y) {
        this._x = x;
        this._y = y;
    }

    set x (value) {
        this._x = value;
    }

    set y (value) {
        this._y = value;
    }
    
    get () {
        return {
            x: this._x,
            y: this._y
        };
    }
}

export class Component {
  
    constructor (name, description, location) {
        this._name = name;
        this._description = description;
        this._looks = [];
        this._sounds = [];
        this._variables = [];
        this._behaviors = [];
        this._location = location;
        this._feedback = '';
    }
  
    get name () {
        return this._name;
    }
  
    set name (value) {
        this._name = value;
    }
  
    get description () {
        return this._description;
    }
  
    set description (value) {
        this._description = value;
    }

    get location () {
        return this._location;
    }

    set location (value) {
        this._location = value;
    }
  
    toJSON () {
        return {
            name: this._name,
            description: this._description
        };
    }
}

export class Relationship {
    constructor (name, description, components, location) {
        this._name = name;
        this._description = description;
        this._components = components;
        this._location = location;
        this._feedback = '';
    }

    get name () {
        return this._name;
    }

    set name (value) {
        this._name = value;
    }

    get description () {
        return this._description;
    }

    set description (value) {
        this._description = value;
    }

    get components () {
        return this._components;
    }

    set components (value) {
        this._components = value;
    }

    get location () {
        return this._location;
    }

    set location (value) {
        this._location = value;
    }

    toJSON () {
        return {
            name: this._name,
            description: this._description,
            components: this._components.map(component => component.toJSON())
        };
    }
}

// Storyboard object

export class Storyboard {

    constructor (title, components = [], relationships = []) {
        this._title = title;
        this._description = '';
        this._components = components;
        this._relationships = relationships;
        this._feedback = '';
    }

    get components () {
        return this._components;
    }

    set components (value) {
        this._components = value;
    }

    get title () {
        return this._title;
    }

    set title (value) {
        this._title = value;
    }

    get description () {
        return this._description;
    }

    set description (value) {
        this._description = value;
    }

    get feedback () {
        return this._feedback;
    }

    set feedback (value) {
        this._feedback = value;
    }

    addComponent (title, description) {
        location = new Location(0, 0);
        const component = new Component(title, description, location);
        this._components.push(component);
    }

    getComponent (index) {
        return this._components[index];
    }

    addRelationship (title, description) {
        location = new Location(0, 0);
        const relationship = new Relationship(title, description, location);
        this._relationships.push(relationship);
    }

    getRelationship (index) {
        return this._relationships[index];
    }

    get relationships () {
        return this._relationships;
    }

    set relationships (value) {
        this._relationships = value;
    }

    toJSON () {
        return {
            title: this._title,
            description: this._description,
            feedback: this._feedback,
            components: this._components.map(c => c.toJSON()),
            relationships: this._relationships.map(r => r.toJSON())
        };
    }
}

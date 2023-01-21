export default class Recipe {
  constructor(id, name, tags, imageName='') {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.imageName = imageName;
  }

  tags=[];
}

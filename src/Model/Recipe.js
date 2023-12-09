export default class Recipe {
  constructor(name, tags, imageName='') {
    this.name = name;
    this.tags = tags;
    this.imageName = imageName;
  }

  tags=[];
}

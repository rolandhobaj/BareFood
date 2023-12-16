export default class Recipe {
  constructor(name, tags, imageName='', imageUri = '') {
    this.name = name;
    this.tags = tags;
    this.imageName = imageName;
    this.imageUri = imageUri
  }

  tags=[];
}

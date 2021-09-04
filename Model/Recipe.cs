using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Model
{
    public enum Difficulty
    {
        Low,
        Medium,
        High
    }

    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Difficulty Difficulty { get; set; }

        public int MinutesToDo { get; set; }

        public string Description { get; set; }
    }
}

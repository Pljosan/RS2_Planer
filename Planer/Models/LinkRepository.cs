using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace Planer.Models
{
    public class LinkRepository : ILinkRepository
    {
        private ApplicationDbContext repository;

        public LinkRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<Link> Links => 
            repository.Links.Include(l => l.User);

        public void Save (Link link)
        {
            repository.Attach(link.User);

            if (link.LinkID == 0)
                repository.Links.Add(link);

            repository.SaveChanges();                
        }

    }

}
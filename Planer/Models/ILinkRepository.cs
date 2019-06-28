using System.Linq;
using System.Reflection.PortableExecutable;

namespace Planer.Models
{
    public interface ILinkRepository
    {
        IQueryable<Link> Links { get; }

        void Save (Link link);
        void Save ();
        void Delete(Link link);
    }
}
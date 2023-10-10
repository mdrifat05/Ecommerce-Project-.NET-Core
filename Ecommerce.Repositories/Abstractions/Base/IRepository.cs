﻿using Ecommerce.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Repositories.Abstractions.Base
{
    public interface IRepository<T> where T: class
    {
        bool Add(T entity);
        bool AddRange(ICollection<T> entities);
        bool Update(T entity);
        bool UpdateRange(ICollection<T> entity);
        bool Delete(T entity);
        ICollection<T> GetAll();
    }
}

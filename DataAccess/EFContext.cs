using DataAccess.Entity.Communication;
using DataAccess.Entity.Role;
using DataAccess.Entity.Store;
using DataAccess.Entity.Store.Product;
using DataAccess.Entity.Store.Product.Communication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }

        public DbSet<UserGames> UserGames { get; set; }
        public DbSet<GameGanres> GameGanres { get; set; }
        public DbSet<GameLangauges> GameLangauges { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Ganre> Ganres { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<RecSystemRequirements> RecSystemRequirements { get; set; }
        public DbSet<MinSystemRequirements> MinSystemRequirements { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Game>()
                .HasOne(u => u.MinSystemRequirementProduct)
                .WithOne(t => t.GameOf)
                .HasForeignKey<MinSystemRequirements>(sid => sid.Id);

            builder.Entity<Game>()
                .HasOne(u => u.RecSystemRequirementProduct)
                .WithOne(t => t.GameOf)
                .HasForeignKey<RecSystemRequirements>(sid => sid.Id);

            builder.Entity<UserGames>()
            .HasKey(c => new { c.UserId, c.GameId });
            builder.Entity<GameGanres>()
            .HasKey(c => new { c.GameId, c.GanreId }); 
            builder.Entity<GameLangauges>()
            .HasKey(c => new { c.GameId, c.LanguageId });

            base.OnModelCreating(builder);
        }
    }
}

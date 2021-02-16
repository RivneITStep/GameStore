using DataAccess.Entity.Communication;
using DataAccess.Entity.Role;
using DataAccess.Entity.Store;
using DataAccess.Entity.Store.Communication;
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


        public DbSet<PublisherSeriesGames> PublisherSeriesGames {get;set;}
        public DbSet<UserGames> UserGames { get; set; }
        public DbSet<UserResponses> UserResponses { get; set; }
        public DbSet<UserMoreInfo> UserMoreInfo { get; set; }
        public DbSet<GameGanres> GameGanres { get; set; }
        public DbSet<GameLangauges> GameLangauges { get; set; }
        public DbSet<GameResponses> GameResponses { get; set; }
        public DbSet<GameSeriesGames> GameSeriesGames { get; set; }
        public DbSet<PublisherSeriesGames> PublisherSeriesGame { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Ganre> Ganres { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Response> Responses { get; set; }
        public DbSet<RecSystemRequirements> RecSystemRequirements { get; set; }
        public DbSet<MinSystemRequirements> MinSystemRequirements { get; set; }
        public DbSet<SeriesGame> SeriesGames { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<GameImages> GameImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<User>()
                .HasOne(u => u.userMoreInfo)
                .WithOne(t => t.User)
                .HasForeignKey<UserMoreInfo>(uid => uid.Id);

            builder.Entity<Game>()
                .HasOne(u => u.MinSystemRequirementProduct)
                .WithOne(t => t.GameOf)
                .HasForeignKey<MinSystemRequirements>(sid => sid.Id);

            builder.Entity<Game>()
                .HasOne(u => u.RecSystemRequirementProduct)
                .WithOne(t => t.GameOf)
                .HasForeignKey<RecSystemRequirements>(sid => sid.Id);

            builder.Entity<PublisherSeriesGames>()
            .HasKey(c => new { c.PublisherId, c.SeriesGameId });
            builder.Entity<UserGames>()
            .HasKey(c => new { c.UserId, c.GameId });
            builder.Entity<UserResponses>()
            .HasKey(c => new { c.UserId, c.ResponseId });
            builder.Entity<GameGanres>()
            .HasKey(c => new { c.GameId, c.GanreId }); 
            builder.Entity<GameLangauges>()
            .HasKey(c => new { c.GameId, c.LanguageId });
            builder.Entity<GameResponses>()
            .HasKey(c => new { c.GameId, c.ResponseId });
            builder.Entity<GameSeriesGames>()
            .HasKey(c => new { c.GameId, c.SeriesGameId });
            builder.Entity<GameImages>()
            .HasKey(c => new { c.GameId, c.ImageId });

            base.OnModelCreating(builder);
        }
    }
}

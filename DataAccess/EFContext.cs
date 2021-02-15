using DataAccess.Entity.Communication;
using DataAccess.Entity.Role;
using DataAccess.Entity.Role.Communication;
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


        public DbSet<PublisherGames> PublisherGames { get; set; }
        public DbSet<PublisherSeriesGames> PublisherSeriesGames {get;set;}
        public DbSet<UserGames> UserGames { get; set; }
        public DbSet<UserResponses> UserResponses { get; set; }
        public DbSet<UserFriends> UserFriends { get; set; }
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
        public DbSet<SystemRequirements> SystemRequirements { get; set; }
        public DbSet<SeriesGame> SeriesGames { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<GameImages> GameImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<User>()
                .HasOne(u => u.userMoreInfo)
                .WithOne(t => t.User)
                .HasForeignKey<UserMoreInfo>(uid => uid.Id);

            builder.Entity<User>()
                .HasOne(u => u.userMoreInfo)
                .WithOne(t => t.User)
                .HasForeignKey<UserMoreInfo>(uid => uid.Id);

            builder.Entity<PublisherGames>()
            .HasKey(c => new { c.PublisherId, c.GameId });
            builder.Entity<PublisherSeriesGames>()
            .HasKey(c => new { c.PublisherId, c.SeriesGameId });
            builder.Entity<UserGames>()
            .HasKey(c => new { c.UserId, c.GameId });
            builder.Entity<UserResponses>()
            .HasKey(c => new { c.UserId, c.ResponseId });
            builder.Entity<UserFriends>()
            .HasKey(c => new { c.UserId, c.FriendId });
            builder.Entity<GameGanres>()
            .HasKey(c => new { c.GameId, c.GanreId }); 
            builder.Entity<GameLangauges>()
            .HasKey(c => new { c.GameId, c.LanguageId });
            builder.Entity<GameResponses>()
            .HasKey(c => new { c.GameId, c.ResponseId });
            builder.Entity<GameSeriesGames>()
            .HasKey(c => new { c.GameId, c.SeriesGameId });   
            
            base.OnModelCreating(builder);
        }
    }
}

﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Planer.Models;

namespace Planer.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190703212923_UserTask")]
    partial class UserTask
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Planer.Models.Link", b =>
                {
                    b.Property<int>("LinkID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PathToFile");

                    b.Property<string>("Url");

                    b.Property<int?>("UserID");

                    b.HasKey("LinkID");

                    b.HasIndex("UserID");

                    b.ToTable("Links");
                });

            modelBuilder.Entity("Planer.Models.Task", b =>
                {
                    b.Property<int>("TaskID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Date");

                    b.Property<string>("GroupID");

                    b.Property<string>("Name");

                    b.Property<bool>("Notified");

                    b.Property<string>("Time");

                    b.Property<int?>("UserID");

                    b.HasKey("TaskID");

                    b.HasIndex("UserID");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Planer.Models.TaskFile", b =>
                {
                    b.Property<int>("TaskFileID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FilePath");

                    b.Property<int?>("TaskID");

                    b.HasKey("TaskFileID");

                    b.HasIndex("TaskID");

                    b.ToTable("TaskFiles");
                });

            modelBuilder.Entity("Planer.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("LinkFolderLocation");

                    b.Property<string>("Password");

                    b.Property<string>("Provider");

                    b.Property<string>("RootFolderLocation");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Planer.Models.UserTask", b =>
                {
                    b.Property<int>("UserTaskID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("TaskID");

                    b.Property<int?>("UserID");

                    b.HasKey("UserTaskID");

                    b.HasIndex("TaskID");

                    b.HasIndex("UserID");

                    b.ToTable("UserTasks");
                });

            modelBuilder.Entity("Planer.Models.Link", b =>
                {
                    b.HasOne("Planer.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID");
                });

            modelBuilder.Entity("Planer.Models.Task", b =>
                {
                    b.HasOne("Planer.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID");
                });

            modelBuilder.Entity("Planer.Models.TaskFile", b =>
                {
                    b.HasOne("Planer.Models.Task", "Task")
                        .WithMany()
                        .HasForeignKey("TaskID");
                });

            modelBuilder.Entity("Planer.Models.UserTask", b =>
                {
                    b.HasOne("Planer.Models.Task", "Task")
                        .WithMany()
                        .HasForeignKey("TaskID");

                    b.HasOne("Planer.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID");
                });
#pragma warning restore 612, 618
        }
    }
}
